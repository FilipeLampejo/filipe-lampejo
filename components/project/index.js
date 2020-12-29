import { RichText } from "prismic-reactjs";

import styles from "./styles.module.scss";
import typography from "../../styles/typography.module.scss";
import grid from "../../styles/grid.module.scss";

import Link from "next/link";

import { useSpring, animated as a } from "react-spring";
import Placeholder from "../placeholder";

import Year from "../date";
import { useState, useEffect, useRef } from "react";
import useTranslation from "next-translate/useTranslation";

const columns = {
	year: (project) => project.date,
	category: (project) =>
		project.categories.map((cat) => cat.category.slug).join(", "),
	client: (project) => project.client,
	project: (project) => project.titulo,
	agency: (project) => project.agency,
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

	const displayColumns = {
		year: (text) => (text ? <Year dateString={text} /> : false),
		category: (categories) =>
			categories && typeof categories === "array" ? (
				<ul className={`${styles.categories} ${typography.smcp}`}>
					{categories.map((cat) => (
						<li key={cat.category.slug}>{cat.category.slug}</li>
					))}
				</ul>
			) : (
				false
			),
		client: (text) => text || false,
		project: (text) => text || false,
		agency: (text) => text || false,
	};

	return (
		<li
			className={`${grid.col} ${styles.listItem} ${styles.listProject} ${
				open ? styles.open : ""
			}`}
		>
			<header
				onClick={() => onClick(project.slug)}
				className={`${styles.columns} ${grid.inner}`}
			>
				{Object.entries(columns).map(([key, value]) => (
					<div className={styles.column} data-col={key} key={key}>
						<dt className="visually-hidden">{t(`project:${key}`)}</dt>
						<dd>{displayColumns[key](value(project)) || "–"}</dd>
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
					{project.capa.url && (
						<Link href={`/projetos/${project.slug}`}>
							<a>
								{project.capa.url && (
									<Placeholder
										width={1200}
										height={
											1200 /
											(project.capa.dimensions.width /
												project.capa.dimensions.height)
										}
										layout="responsive"
										sizes="(max-width: 768px) 150px,
	            							300px"
										src={project.capa.url}
									/>
								)}
							</a>
						</Link>
					)}
				</div>
				<div className={styles.info}>
					<div className={typography.body}>
						{project.sobre && <RichText render={project.sobre} />}
					</div>
					<Link href={`/projetos/${project.slug}`}>
						<a className={`${styles.view} ${typography.smcp}`}>
							{t("project:view")}
						</a>
					</Link>
				</div>
			</a.div>
		</li>
	);
}

export function ProjectList({ projects }) {
	let { t } = useTranslation();
	const [orderBy, setOrderBy] = useState("year");
	const [orderAsc, setOrderAsc] = useState(false);
	const [open, setOpen] = useState();
	const [sortedProjects, setSortedProjects] = useState(projects);
	const toggleOpen = (slug) => {
		open === slug ? setOpen(null) : setOpen(slug);
	};

	useEffect(() => sortTable(projects, { orderAsc, orderBy }), [projects]);

	const reorderTable = (col) => {
		if (col == orderBy) {
			setOrderAsc(!orderAsc);
			sortTable(sortedProjects, { orderAsc: !orderAsc, orderBy: col });
		} else {
			setOrderAsc(true);
			setOrderBy(col);
			sortTable(sortedProjects, { orderAsc: true, orderBy: col });
		}
	};

	const sortTable = (input, { orderAsc, orderBy }) => {
		input &&
			setSortedProjects(
				input.sort((pa, pb) => {
					const a = columns[orderBy](pa);
					const b = columns[orderBy](pb);
					const multiplier = orderAsc ? 1 : -1;
					if (a === b) return 0;
					else if (a === null) return 1;
					else if (b === null) return -1;
					else return a.localeCompare(b) * multiplier;
				})
			);
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
							{orderBy == col ? (orderAsc ? "↓" : "↑") : ""}
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
				sortedProjects.map((project) => (
					<ProjectListItem
						key={project.slug}
						project={project}
						open={open === project.slug}
						onClick={toggleOpen}
					/>
				))}
		</ul>
	);
}

export default function ProjectThumb({ project, onHover }) {
	return (
		<Link href={`/projetos/${project.slug}`}>
			<a
				className={styles.project}
				onMouseEnter={() => onHover(true)}
				onMouseLeave={() => onHover(false)}
			>
				{project.capa.url && (
					<div className={styles.thumb}>
						<Placeholder
							width={600}
							height={
								600 /
								(project.capa.dimensions.width / project.capa.dimensions.height)
							}
							sizes="(max-width: 768px) 150px,
            							300px"
							layout="responsive"
							src={project.capa.url}
							alt={project.capa.alt}
						/>
					</div>
				)}
				<div className={`${styles.info}`}>
					<ul className={`${styles.categories} ${typography.smcp}`}>
						{project.categories.map((cat) => (
							<li key={cat.category.slug}>{cat.category.slug}</li>
						))}
					</ul>
					<h2 className="visually-hidden">
						{RichText.asText(project.displaytitle)}
					</h2>
					<div className={`${styles.title} ${typography.headingOne}`}>
						<RichText render={project.displaytitle} />
					</div>
				</div>
			</a>
		</Link>
	);
}
