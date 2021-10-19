import { RichText } from "prismic-reactjs";

import styles from "./styles.module.scss";
import typography from "../../styles/typography.module.scss";
import grid from "../../styles/grid.module.scss";

import Link from "next/link";

import { useSpring, animated as a } from "react-spring";
import Placeholder from "../placeholder";

import Year from "../date";
import { useState, useEffect, useRef, useMemo } from "react";
import useTranslation from "next-translate/useTranslation";

const columns = {
	year: (project) => project.date,
	category: (project) =>
		project.categories
			.map(({ category }) => category.data.title && RichText.asText(category.data.title))
			.join(", "),
	project: (project) => RichText.asText(project.displaytitle),
	client: (project) => project.client,
	agency: (project) => project.agency,
};

const displayColumns = {
	year: (text) => (text ? <Year dateString={text} /> : false),
	category: (categories) =>
		categories ? (
			<span className={`${styles.categories} ${typography.smcp}`}>
				{categories}
			</span>
		) : (
			false
		),
	project: (text) => text || false,
	client: (text) => text || false,
	agency: (text) => text || false,
};

function ProjectListItem({ project, open, onClick }) {
	let { t } = useTranslation();
	let details = useRef();
	const [height, setHeight] = useState(0);
	const springProps = useSpring({ height: height });

	useEffect(() => {
		if (details.current) {
			const initialPos = details.current.getBoundingClientRect().height;
			details.current.style.height = open ? "auto" : 0;
			const finalPos = details.current.getBoundingClientRect().height;
			details.current.style.height = initialPos;
			setHeight(finalPos);
		}
	}, [open, height]);

	return (
		<li
			className={`${grid.col} ${styles.listItem} ${styles.listProject} ${
				open ? styles.open : ""
			}`}
		>
			<header
				onClick={() => onClick(project.uid)}
				className={`${styles.columns} ${grid.inner}`}
			>
				{Object.entries(columns).map(([key, value]) => (
					<div className={styles.column} data-col={key} key={key}>
						<dt className="visually-hidden">{t(`project:${key}`)}</dt>
						<dd>{displayColumns[key](value(project.data)) || "–"}</dd>
					</div>
				))}
				<div className={styles.column} data-col="more" key="more">
					+
				</div>
			</header>
			<a.div
				ref={details}
				className={`${styles.details} ${grid.inner}`}
				style={springProps}
			>
				<div className={styles.image}>
					{project.data.capa.url && (
						<Link href={`/projetos/${project.uid}`} passHref>
							<a>
									<Placeholder
										width={1200}
										height={
											1200 /
											(project.data.capa.dimensions.width /
												project.data.capa.dimensions.height)
										}
										layout="responsive"
										sizes="(max-width: 768px) 300px,
	            							600px"
										src={project.data.capa.url}
									/>
							</a>
						</Link>
					)}
				</div>
				<div className={styles.info}>
					<div className={typography.body}>
						{project.data.sobre && <RichText render={project.data.sobre} />}
					</div>
					<Link href={`/projetos/${project.uid}`}>
						<a className={`${styles.view} ${typography.smcp}`}>
							{t("project:view")}
						</a>
					</Link>
				</div>
			</a.div>
		</li>
	);
}

const getSortedTable = (projects, { orderAsc, orderBy }) => {
	if (!Array.isArray(projects)) return [];
	return	projects.sort((pa, pb) => {
			const a = columns[orderBy](pa.data);
			const b = columns[orderBy](pb.data);
			const multiplier = orderAsc ? 1 : -1;
			if (a === b) return 0;
			else if (a === null) return 1;
			else if (b === null) return -1;
			else return a.localeCompare(b) * multiplier;
		})
}

export function ProjectList({ projects }) {
	let { t } = useTranslation();
	const [orderBy, setOrderBy] = useState("year");
	const [orderAsc, setOrderAsc] = useState(false);
	const [open, setOpen] = useState();

	const sortedProjects = useMemo(() => getSortedTable(projects, { orderAsc, orderBy }), [projects, orderAsc, orderBy]);

	const toggleOpen = (slug) => {
		open === slug ? setOpen(null) : setOpen(slug);
	};

	const reorderTable = (col) => {
		setOrderBy(col);
		if (col === orderBy) {
			setOrderAsc(!orderAsc);
		} else {
			setOrderAsc(true);
		}
	};

	return (
		<ul className={`${styles.list}`}>
			<li
				key="header"
				className={`${styles.listItem} ${styles.listHeader} ${grid.col}`}
			>
				<ul className={`${styles.columns} ${grid.inner}`}>
					{Object.keys(columns).map((col) => (
						<li
							key={col}
							data-col={col}
							className={styles.column}
							onClick={() => reorderTable(col)}
							className={`${typography.smcp} ${styles.column}`}
						>
							{t(`project:${col}`)}{" "}
							{orderBy === col ? (orderAsc ? "↓" : "↑") : ""}
						</li>
					))}
					<li
						key={"more"}
						className={styles.column}
						data-col="more"
						key="more"
					></li>
				</ul>
			</li>
			{sortedProjects &&
				sortedProjects?.map((project) => (
					<ProjectListItem
						key={project.uid}
						project={project}
						open={open === project.uid}
						onClick={toggleOpen}
					/>
				))}
		</ul>
	);
}

export default function ProjectThumb({ project, layoutInfo, onHover }) {
	const skeleton = {
		capa: {
			dimensions: {
				width: 1000,
				height: 600,
			},
			url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=",
			alt: "",
		},
		categories: [],
		displaytitle: "",
	};
	const data = project.slug ? project : skeleton;
	if (!data || !data.slug) return null;
	const coverImage = layoutInfo.image.url ? layoutInfo.image : data.capa;
	return (
		<Link href={`/projetos/${data.slug}`}>
			<a
				style={{
					"--project__colStart": layoutInfo.colstart,
					"--project__colEnd": layoutInfo.colend,
					"--project__marginBottom": layoutInfo.marginbottom,
				}}
				className={styles.project}
				onMouseEnter={() => onHover(true)}
				onMouseLeave={() => onHover(false)}
			>
				<div className={styles.thumb}>
					{coverImage && (
						<Placeholder
							width={coverImage.dimensions.width}
							height={coverImage.dimensions.height}
							sizes="(max-width: 768px) 300px,
								(max-width: 1920px) 600px,
								1200px"
							layout="responsive"
							src={coverImage.url}
							alt={coverImage.alt}
							quality={100}
						/>
					)}
				</div>

				{layoutInfo.hoverfx && (
					<div className={`${styles.info}`}>
						<ul className={`${styles.categories} ${typography.smcp}`}>
							{data.categories.map(({ category }) => (
								<li key={category.uid}>
									{RichText.asText(category.data.title)}
								</li>
							))}
						</ul>
						<div className={`${styles.title} ${typography.headingOne}`}>
							{data.displaytitle && <RichText render={data.displaytitle} />}
						</div>
					</div>
				)}
			</a>
		</Link>
	);
}
